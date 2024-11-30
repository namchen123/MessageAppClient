import userImage from "./images/user.png";

function RightMenu() {
    return (
        <div class="col-3 border-start p-0 h-100">
            <div class="h-100">
                <div class="head d-flex justify-content-center align-content-center border-bottom"><p class="m-2 fs-5">Thông tin</p></div>
                <div class="d-flex rounded-1 d-flex flex-column align-items-center">
                    <img class="rounded-2" src={userImage} style={{ width: "80px", height: "80px" }} alt=""/>
                    <div>
                        <p class="UserName fs-5 fw-bold mt-2 mb-0">Nick</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightMenu
