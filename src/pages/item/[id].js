import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import requestService from "@utils/axios";

export default function ItemSinglePage() {
  const router = useRouter();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = router.query;
  const getSingle = async (id) => {
    const response = await requestService.get(`/api/todos/${id}`);

    if (response?.response) setData(response.response);
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getSingle(id);
    }
  }, [id]);

  if (loading) {
    return <>loading...</>;
  }
  return (
    <Container>
      {data?.title} {data?.description}
    </Container>
  );
}
