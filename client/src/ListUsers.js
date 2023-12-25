import { height } from "./ChatRoom";

export const ListUsers = ({ handleChooseUser }) => {
  return (
    <div style={{ width: "25vw", height: height, overflowY: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column"}}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div
            style={{
              backgroundColor: "pink",
              flexBasis: '75px',
              border: "1px solid blue",
              cursor: "pointer",
            }}
            onClick={() => handleChooseUser(item)}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
