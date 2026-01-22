// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IntentRegistry {
    enum IntentStatus {
        Pending,
        Executed,
        Expired,
        Cancelled
    }

    struct Intent {
        uint256 id;
        address owner;
        address token;
        uint256 amount;
        address recipient;
        IntentStatus status;
        uint256 createdAt;
        uint256 deadline;
        uint256 executedAt;
        bytes32 txHash;
    }

    uint256 private intentCounter;
    mapping(uint256 => Intent) public intents;
    mapping(address => uint256[]) public userIntents;

    event IntentRegistered(
        uint256 indexed intentId,
        address indexed owner,
        uint256 deadline
    );

    event IntentExecuted(
        uint256 indexed intentId,
        uint256 executedAt,
        bytes32 txHash
    );

    event IntentCancelled(uint256 indexed intentId, uint256 cancelledAt);

    function registerIntent(
        address _token,
        uint256 _amount,
        address _recipient,
        uint256 _deadline
    ) external returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_amount > 0, "Amount must be greater than 0");
        require(_recipient != address(0), "Invalid recipient");

        intentCounter++;
        uint256 intentId = intentCounter;

        Intent storage newIntent = intents[intentId];
        newIntent.id = intentId;
        newIntent.owner = msg.sender;
        newIntent.token = _token;
        newIntent.amount = _amount;
        newIntent.recipient = _recipient;
        newIntent.status = IntentStatus.Pending;
        newIntent.createdAt = block.timestamp;
        newIntent.deadline = _deadline;

        userIntents[msg.sender].push(intentId);

        emit IntentRegistered(intentId, msg.sender, _deadline);

        return intentId;
    }

    function executeIntent(uint256 _intentId, bytes32 _txHash) external {
        Intent storage intent = intents[_intentId];
        require(intent.id != 0, "Intent does not exist");
        require(
            intent.status == IntentStatus.Pending,
            "Intent already processed"
        );
        require(block.timestamp <= intent.deadline, "Intent expired");

        intent.status = IntentStatus.Executed;
        intent.executedAt = block.timestamp;
        intent.txHash = _txHash;

        emit IntentExecuted(_intentId, block.timestamp, _txHash);
    }

    function cancelIntent(uint256 _intentId) external {
        Intent storage intent = intents[_intentId];
        require(intent.id != 0, "Intent does not exist");
        require(intent.owner == msg.sender, "Not intent owner");
        require(
            intent.status == IntentStatus.Pending,
            "Intent already processed"
        );

        intent.status = IntentStatus.Cancelled;

        emit IntentCancelled(_intentId, block.timestamp);
    }

    function getIntent(
        uint256 _intentId
    ) external view returns (Intent memory) {
        require(intents[_intentId].id != 0, "Intent does not exist");
        return intents[_intentId];
    }

    function getUserIntents(
        address _user
    ) external view returns (uint256[] memory) {
        return userIntents[_user];
    }

    function getIntentCount() external view returns (uint256) {
        return intentCounter;
    }
}
