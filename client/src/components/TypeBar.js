import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "..";

const TypeBar = observer(() => {
  const { product } = useContext(Context);

  return (
    <ListGroup className="type-bar">
      <ListGroup.Item
        className={`type-bar__item${!product.selectedType.id ? " type-bar__item--active" : ""}`}
        active={!product.selectedType.id}
        onClick={() => product.setSelectedType({})}
      >
        Todos
      </ListGroup.Item>
      {product.types.map(type =>
        <ListGroup.Item 
          className={`type-bar__item${type.id === product.selectedType.id ? " type-bar__item--active" : ""}`}
          active={type.id === product.selectedType.id}
          onClick={() => product.setSelectedType(type)}
          key={type.id}>
            {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
});

export default TypeBar;
