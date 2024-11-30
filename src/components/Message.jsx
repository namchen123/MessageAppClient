function Message({content, senderid, nameid, user,sender}) {
  return (
    <>
    <span>{senderid==nameid ? "" : sender.username}</span>
    <div className={`d-flex justify-content-${senderid==nameid ? "end" : "start"} m-2`}>
      <p className={`bg-${senderid==nameid ? "success" : "primary"} fs-6 p-2 rounded-5 text-light`}>{content}</p>
    </div>
    </>
  );
}

export default Message;
