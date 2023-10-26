import { createRouter } from "next-connect";
const router = createRouter();
import { _mock } from "../mock";

router.get("/api/todos", async (req, res) => {
  const response = {
    status: "ok",
    message: "Success",
  };

  response.response = [
    ..._mock,
    ...[...Array(12).keys()].map((item) => ({
      id: item * 10,
      title: "Such wow",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ipsa explicabo velit dolor dolorum eaque? Unde deserunt accusamus at totam!",
    })),
  ];

  try {
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
    });
  }
});

export default router.handler();
