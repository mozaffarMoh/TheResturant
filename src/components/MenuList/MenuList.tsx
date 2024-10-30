'use client';
import './MenuList.scss';

const MenuList = () => {
  return (
    <div className="MenuList">
      {[].map((element: any, index: number) => {
        return (
          <div
            className="items"
            key={index}
          >
            <h1>{element.itemsType}</h1>
            <div className="items-template flexCenter">
              {element.items.map((item: any, itemIndex: number) => {
                return (
                  <div
                    className="item flexBetweenColumn"
                    key={itemIndex}
                  >
                    <img src={item.img} />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.unitPrice}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;
