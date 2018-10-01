import React from 'react';
import './styles.css';

const ControlBar = ({
    item,
    isItemUpdating,
    handleUpdateItemText,
    handleMoveListItem,
    handleSetItemUpdating,
    handleAddList,
}) => (
    <React.Fragment>
        <button
            className="arrow-button"
            onClick={() => handleMoveListItem(item, true)}
        >
            ⬆
        </button>
        <button
            className="arrow-button"
            onClick={() => handleMoveListItem(item, false)}
        >
            ⬇
        </button>
        {isItemUpdating ? (
          <input
            defaultValue={item.text}
            onChange={handleUpdateItemText}
          />
        ) : (
          item.text
        )}
        <button
          onClick={() => handleSetItemUpdating(item, isItemUpdating)}
        >
          {isItemUpdating ? "SAVE" : "UPDATE"}
        </button>
        <button
          onClick={() => handleAddList(item._id)}
        >
          + ADD LIST
        </button>
    </React.Fragment>
)

export default ControlBar