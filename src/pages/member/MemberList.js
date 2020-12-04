import "./MemberList.scss";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

import { getMembers, createMember } from "../../lib/api/memberAPI";

function MemberList({ history, match }) {
  const [membersState, setMembersState] = useState({
    members: null,
    status: "idle",
  });

  useEffect(() => {
    (async () => {
      setMembersState({ members: null, status: "pending" });
      try {
        const result = await getMembers();
        setTimeout(
          () => setMembersState({ members: result, status: "resolved" }),
          800
        );
      } catch (e) {
        setMembersState({ members: null, status: "rejected" });
      }
    })();
  }, []);

  const onClickCreateCard = async () => {
    try {
      const data = await createMember({
        name: "",
        profileUrl: "",
        instagram: "",
        introduction: "",
        mbti: "",
      }); //빈 테이터 열을 만들고 여기에 데이터를 넣는????
      setMembersState({
        status: "resolved",
        members: [...membersState.members, data], //기존 데이터 결과?
      }); // 요걸 통해 새로고침 안해도 바로 삭제되는ㄷ???
    } catch (e) {
      // fail
    }
  };

  switch (membersState.status) {
    case "pending":
      return <Loading />;
    case "rejected":
      return <div>데이터 로딩 실패</div>;
    case "resolved":
      return (
        <div className="member-list">
          <div className="member-list__title">파트원 소개</div>
          <div className="member-list__header member-list-header">
            <div className="member-list-header__nav">Gallery View</div>
            <div className="member-list-header__empty"></div>
            <Button text="Properties" textColor="#777"></Button>
            <Button text="Filter" textColor="#777"></Button>
            <Button text="Sort" textColor="#777"></Button>
            <Button text="Search" textColor="#777" icon="search"></Button>
            <Button text="..." textColor="#777"></Button>
          </div>
          <hr />
          <div className="member-list-content-wrapper">
            {membersState.members.map((member, i) => (
              <Card
                key={"card-" + i}
                memberData={member}
                onDeleteCard={() =>
                  setMembersState({
                    status: "resolved",
                    members: membersState.members.filter(
                      (mem) => mem.id !== member.id
                    ),
                  })
                }
              />
            ))}
            <div className="create-card" onClick={onClickCreateCard}>
              + New
            </div>
          </div>
        </div>
      );
    case "idle":
    default:
      return <div></div>;
  }
}

export default MemberList;
