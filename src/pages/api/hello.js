// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

import { createRouter } from "next-connect";
const router = createRouter();

router.get("/api/assets/:assetId/metadata", async (req, res) => {
    // const { assetId } = req.params;
    // res.setHeader("Access-Control-Allow-Origin", "*");

    // if (!assetId) {
    //     return res.status(400).json({
    //         message: "Invalid parameters",
    //         status: "error",
    //     });
    // }

    try {
      

    
            return res.status(404).json({
                message: "Asset not found",
                status: "error",
            });
        
    } catch (error) {
        console.error(error);
        return res.json({
            status: "error",
        });
    }
});

export default router.handler();
