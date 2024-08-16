import { z } from "zod"

export const BlogFormSchema = z.object({
    title: z.string().min(2, {
        message: "タイトルは最低5文字以上で入力してください",
    }),
    image_url: z.string().url({ message: "無効なリンクです" }),
    content: z.string().min(2, {
        message: "内容は最低10文字以上で入力してください",
    }),
    is_free: z.boolean(),
    is_premium: z.boolean(),
}).refine((data) => {
    const image_url = data.image_url
    try {
        const url = new URL(image_url);
        return url.hostname === "images.unsplash.com";
    } catch (error) {
        console.log(error);
        return false;
    }
},
    {
        message: 'サポートされていない画像がアップロードされています',
        path: ["image_url"]
    }
);

export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>