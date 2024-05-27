import React, { useState } from "react";
import './DeleteMember.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import jsCookies from "js-cookie";

const DeleteMember = (props) => {
    const [cookies] = useCookies('accessToken');
    const { userInfo } = props;
    const [value, setValue] = useState({ email: userInfo.email, password: '' });
    const fromDbPw = userInfo.password;
    const navigator = useNavigate();
    
    async function comparePasswords(userInputPassword, storedPassword) {
        try {
            const isMatch = await bcrypt.compare(userInputPassword, storedPassword);
            if (!isMatch) {
                alert("비밀번호가 일치하지 않습니다.");
                return false;
            } else {
                return true;
            }
        } catch (err) {
            console.error('비교 중 오류 발생:', err);
            alert("다시 시도해주세요. 이 오류가 계속 된다면 관리자에게 문의해주세요.");
            return false;
        }
    }

    const handleDeleteClick = async (event) => {
        event.preventDefault();
        const isPwCorrect = await comparePasswords(value.password, fromDbPw);

        if (isPwCorrect) {
            
            axios.delete('http://localhost:8988/member/delete', {
                data : value,
                headers: {
                    Authorization: cookies.accessToken
                }
            })
                .then((response) => {
                    alert(response.data.message);
                    jsCookies.remove('accessToken');
                    navigator('/login');
                })
                .catch((error) => {
                    console.log(error);
                    alert("데이터베이스 오류")
                })
        }
    }
    
    return (
        <>
            <h1>회원 탈퇴</h1>
            <div className="DEOK_MP_CL_deleteMember">
                <div className="warning">
                    <p className="cause">* 회원 탈퇴를 신청하시기 전에 아래의 유의사항을 한 번 더 확인해 주시기 바랍니다.</p>
                </div>
                <div className="warning_info">
                    <ul>
                        <li>회원 탈퇴를 완료하시면 번복이 불가능합니다.</li>
                        <li>개인정보보호법에 따라 고객님의 이용기록, 개인정보 등 모든 기록이 삭제됩니다.</li>
                        <li>회원 탈퇴가 완료되면 즉시 홈페이지 로그인이 제한됩니다.</li>
                    </ul>
                </div>
                <form onSubmit={handleDeleteClick} className="DEOK_MP_CL_deleteMember_form-box">
                    <div className="DEOK_MP_CL_deleteMember_input-box">
                        <div>
                            <span>이메일</span>
                            <input
                                className="disabled"
                                type='text'
                                value={userInfo.email}
                                disabled
                            />
                        </div>
                        <div>
                            <span>비밀번호</span>
                            <input
                                type='password'
                                onChange={(event) => setValue(prevState => ({
                                    ...prevState,
                                    password: event.target.value
                                }))}
                            />
                        </div>
                        <div>
                            <b>정말로 회원탈퇴를 하시겠습니까?</b>
                        </div>
                        <div className="DEOK_MP_CL_deleteMember_button-box">
                            <button><span>취소</span></button>
                            <button type="submit"><span>확인</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeleteMember;