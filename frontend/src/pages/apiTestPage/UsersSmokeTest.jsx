// UsersSmokeTest.jsx
import { useEffect, useState } from "react";
import { getUserList } from "../../api/DevimApi";


export default function UsersSmokeTest() {
    const [data, setData] = useState(null);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        getUserList(0, 10, controller.signal)
            .then((d) => {
                console.log("[getUserList] response:", d);
                setData(d);
            })
            .catch((e) => {
                if (e.code !== "ERR_CANCELED" && e.name !== "CanceledError") {
                    console.error(e);
                    setErr(e.message || "요청 실패");
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    if (loading) return <div>로딩…</div>;
    if (err) return <div>에러: {err}</div>;

    return (
        <pre style={{ background: "#111", color: "#0f0", padding: 12, overflow: "auto" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}
