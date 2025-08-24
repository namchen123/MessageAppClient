<<<<<<< HEAD
function Message({content, senderid, nameid, user,sender}) {
  return (
    <>
    <span>{senderid==nameid ? "" : sender.username}</span>
    <div className={`d-flex justify-content-${senderid==nameid ? "end" : "start"} m-2`}>
      <p className={`bg-${senderid==nameid ? "success" : "primary"} fs-6 p-2 rounded-5 text-light`}>{content}</p>
    </div>
=======
import { useContext, useEffect, useState } from "react";
import Context from "../Context";
function Message({
  messageId,
  conversationchoose,
  content,
  senderid,
  nameid,
  user,
  sender,
  files,
  recall,
  highlight
}) {
  const [fileUrl, setFileUrl] = useState("");
  const [isHover, setIsHover] = useState(false);
  const { Recall ,targetMessageId} = useContext(Context);
  const fetchFileBlob = async () => {
    if (content == "") {
      const filekey =
        files[0].timeStamp == null
          ? files[0].fileName
          : `${files[0].timeStamp}_${files[0].fileName}`;
      const response = await fetch(
        `https://localhost:7289/api/Conversations/GetFile?filename=${filekey}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
      );

      if (!response.ok) {
        console.error("Không lấy được file");
        return;
      }
      const blob = await response.blob(); // Chuyển response thành Blob
      const url = URL.createObjectURL(blob); // Tạo Blob URL
      console.log(`${files[0].fileName}`, url);
      const underscoreIndex = files[0].fileName.indexOf("_");
      const result = files[0].fileName.substring(underscoreIndex + 1);
      setLastFileName(result);
      setFileUrl(url);
    }
  };
  const [lastfilename, setLastFileName] = useState("");
  useEffect(
    function () {
      if (content == "") {
        fetchFileBlob();
      }
    },
    [files]
  );

  return (
    <>
      <span>{senderid == nameid ? "" : sender.username}</span>
      {recall ? (
        <div
          className={`d-flex justify-content-${
            senderid == nameid ? "end" : "start"
          } m-2`}
        >
          <p
            className={`bg-white border border-secondary fs-6 p-2 rounded-5 text-muted m-0`}
          >
            Tin nhắn đã được thu hồi
          </p>
        </div>
      ) : (
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`d-flex justify-content-${
            senderid == nameid ? "end" : "start"
          } m-2`}
        >
          {content == "" ? (
            files[0].fileType == "image/png" ? (
              <>
                <img
                  data-bs-toggle="modal"
                  data-bs-target="#imagemodal"
                  src={fileUrl}
                  alt="File"
                  style={{ width: "90px", height: "90px" }}
                />
                <div class="modal fade modal-xl" id="imagemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Hình ảnh</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body ">
                        <img src={fileUrl} alt="File" style={{ width: "auto", height: "500px" }} />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : files[0].fileType.startsWith("video/") ? (
              <video
                className=" rounded-2"
                src={fileUrl}
                autoPlay={true}
                controls
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              >
                Trình duyệt không hỗ trợ video.
              </video>
            ) : (
              <a
                className="d-flex justify-content-center align-content-center rounded-5"
                style={{
                  width: "90px",
                  height: "35px",
                  backgroundColor: "gray",
                  textDecoration: "none",
                }}
                href={fileUrl}
                download={files[0]?.fileName}
              >
                <p className="">{lastfilename}</p>
              </a>
            )
          ) : (
            <>
              {senderid == nameid ? (
                <>
                  {isHover && (
                    <span className="d-flex justify-content-center align-items-center me-2">
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => Recall(messageId)}
                      >
                        <i className="fa-solid fa-repeat"></i>
                      </button>
                    </span>
                  )}

                  <p
                    className={`bg-${
                      senderid == nameid ? "success" : "primary"
                    } fs-6 p-2 rounded-5 ${highlight ? "text-danger" : "text-light"} m-0`}
                  >
                    {content}
                  </p>
                </>
              ) : (
                <>
                  <p
                    className={`bg-${
                     senderid == nameid ? "success" : "primary"
                    } fs-6 p-2 rounded-5 ${highlight ? "text-danger" : "text-light"} m-0`}
                  >
                    {content}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      )}
>>>>>>> ead7d2b (lastversion)
    </>
  );
}

export default Message;
