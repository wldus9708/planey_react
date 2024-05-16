import React, { useState } from "react";
import './DeleteMember.css';
import axios from "axios";

const DeleteMember = () => {

    const [value, setValue] = useState({email : 'email@email.com', password : ''});

    const handleDeleteClick = (event) => {
        event.preventDefault();

        axios.get('http://localhost:8888/member/...')
        //          스프링 먼저 뚫어놔야함           //
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
                                className="diabledEmail"
                                type='text'
                                value={value.email}
                                onChange={(event) => setValue(prevState => ({
                                    ...prevState,
                                    email : event.target.value
                                }))}
                            />
                        </div>
                        <div>
                            <span>비밀번호</span>
                            <input
                                type='password'
                                value={value.password}
                                onChange={(event) => setValue(prevState => ({
                                    ...prevState,
                                    password : event.target.value
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