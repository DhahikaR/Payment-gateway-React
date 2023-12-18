import { useEffect, useState } from "react";
import { MIDTRANS_CLIENT_ID, MIDTRANS_API_URL } from "../../utils/const.js";

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const midtransClientKey = MIDTRANS_CLIENT_ID;
    const script = document.createElement("script");
    script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute(`data-client-key`, midtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          console.log("success", result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log("pending", result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};

export default useSnap;
