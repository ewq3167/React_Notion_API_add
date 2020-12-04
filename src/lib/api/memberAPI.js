import axios from "axios";

// const url = 'http://127.0.0.1:5000/api/members';
const url =
  "http://ec2-13-124-127-8.ap-northeast-2.compute.amazonaws.com:3000/api/members";

const getMembers = async () => {
  // http://ec2-13-124-127-8.ap-northeast-2.compute.amazonaws.com:3000/api/members
  try {
    const { data } = await axios.get(`${url}`);
    console.log("[SUCCESS] GET MEMBERS", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] GET MEMBERS", e);
    throw e;
  }
};

const getMember = async (id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    console.log("[SUCCESS] GET MEMBER", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] GET MEMBER", e);
    throw e;
  }
};

const updateMember = async (id, member) => {
  try {
    const { data } = await axios.put(`${url}/${id}`, member);
    console.log("[SUCCESS] UPDATE MEMBER", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] UPDATE MEMBER", e);
    throw e;
  }
};

const createMember = async (member) => {
  try {
    const { data } = await axios.post(`${url}`, member);
    console.log("[SUCCESS] CREATE MEMBER", data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] CREATE MEMBER", e);
    throw e; //[논드르렁] [오전 4:24] return은 함수를 끝내면서 반환값에 e를 주는거고 throw는 에러를 뱉는데 그 내용이 e인거고
  }
};

const deleteMember = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    console.log("[SUCCESS] DELETE MEMBER", data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] DELETE MEMBER");
    throw e;
  }
};

const memberAPI = {
  getMembers,
  getMember,
  updateMember,
  createMember,
  deleteMember,
};

export default memberAPI;
export { getMember, getMembers, updateMember, createMember, deleteMember };
