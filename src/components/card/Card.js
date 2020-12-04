import "./Card.scss";
import { DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { deleteMember } from "../../lib/api/memberAPI";

function Card({ memberData, history, onDeleteCard }) {
  const onClickRemove = async (evt) => {
    evt.stopPropagation(); // 이걸 실행할 시 HISTORY 실행 안되고 DELETE바로 실행 이벤트 버블링
    try {
      await deleteMember(memberData.id);
      onDeleteCard();
    } catch (e) {
      // fail
    }
  };
  return (
    <div
      className="card"
      draggable
      onClick={() => history.push(`/members/${memberData.id}`)}
    >
      {/*히스토리에서 받아와야지 외부에서 데이터 처리를 하는게 아니라 이 카드 컴포넌ㅌ에서 처리 가능*/}
      <div className="remove-button" onClick={onClickRemove}>
        <DeleteOutlined style={{ fontSize: "16px" }} />
      </div>
      <div className="image-area">
        {memberData.profileUrl !== "" ? (
          <img src={memberData.profileUrl} alt="profile" />
        ) : (
          <FileImageOutlined style={{ fontSize: "40px" }} />
        )}
      </div>
      <div className="card__content card__text name">{memberData.name}</div>
      <div className="card__content card__text instagram">
        {memberData.instagram}
      </div>
      <div className="card__content card__text introduction">
        {memberData.introduction}
      </div>
      <div className="card__content card__text mbti">{memberData.mbti}</div>
    </div>
  );
}

export default withRouter(Card); // 이거 사용해야지만 history.push 먹힘
