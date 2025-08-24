import { useState } from "react";

function CallScreen({
  localVideoRef,
  remoteVideoRef,
  remoteUserName,
  handleCancelCall,
  onToggleMic,
  onToggleCamera,
}) {
  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 p-3 bg-white border rounded shadow d-flex flex-column"
      style={{ zIndex: 1055, width: "500px" }}
    >
      <div className="d-flex gap-2 mb-3" style={{ height: "180px" }}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="flex-fill rounded"
          style={{ backgroundColor: "#000",width: "100px"}}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="flex-fill rounded"
          style={{ backgroundColor: "#000", width: "100px"}}
        />
      </div>

      <div className="d-flex justify-content-around mb-2">
        
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={handleCancelCall}
        >
          End Call
        </button>
      </div>

      <div className="text-center fw-semibold" style={{ fontSize: "0.9rem" }}>
        Đang gọi với: {remoteUserName}
      </div>
    </div>
  );
}

export default CallScreen;
