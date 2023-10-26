import { createRouter } from "next-connect";
const router = createRouter();
import { _mock } from "../mock";
router.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Invalid parameters",
      status: "error",
    });
  }

  const response = {
    status: "ok",
    message: "Success",
  };

  response.response = _mock.find((item) => item.id === +id);

  if (!response.response) {
    return res.status(400).json({
      message: "Item not found",
      status: "error",
    });
  }
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
