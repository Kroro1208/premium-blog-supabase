"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IoSaveOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EyeOpenIcon, Pencil1Icon, RocketIcon, StarIcon } from "@radix-ui/react-icons"
import { Switch } from "@/components/ui/switch"
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkDown from "@/app/components/markdown/MarkDown";

const FormSchema = z.object({
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

export default function BlogForm() {
    const [isPreview, setPreview] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            image_url: "",
            content: "",
            is_free: true,
            is_premium: false
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full rounded-md border space-y-6 pb-10">
                <div className="p-5 gap-5 flex flex-wrap items-center justify-between">
                    <div className="flex gap-5 items-center border-b flex-wrap">
                        <span role="button" tabIndex={0}
                            className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-lg hover:ring-2 hover:ring-green-500"
                            onClick={() => setPreview(!isPreview && !form.getFieldState("image_url").invalid)}
                        >{isPreview ? (
                            <>
                                <Pencil1Icon />
                                編集
                            </>
                        ) : (
                            <>
                                <EyeOpenIcon />
                                プレビュー
                            </>
                        )}
                        </span>
                        <FormField
                            control={form.control}
                            name="is_premium"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1 border p-2 rounded-lg bg-zinc-700">
                                            <StarIcon />
                                            <span>Premium</span>
                                            <Switch checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_free"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1 border p-2 rounded-lg bg-zinc-700">
                                            <RocketIcon />
                                            <span>Free</span>
                                            <Switch checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="flex items-center gap-1" disabled={!form.formState.isValid}>
                        <IoSaveOutline />
                        保存
                    </Button>
                </div>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? "divide-x-0" : "divide-x")}>
                                    <Input placeholder="タイトルを入力" {...field}
                                        className={cn("border-none text-lg font-medium leading-relaxed",
                                            isPreview ? "w-0 p-0" : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn("lg:px-10", isPreview ? "w-full mx-auto lg:w-4/5" : "w-1/2 lg:blok")}>
                                        <h1 className="text-3xl font-medium">{form.getValues().title}</h1>
                                    </div>
                                </div>
                            </FormControl>
                            {form.getFieldState("title").invalid && form.getValues().title && <FormMessage />}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? "divide-x-0" : "divide-x")}>
                                    <Input placeholder="画像アップロード" {...field}
                                        className={cn("border-none text-lg font-medium leading-relaxed",
                                            isPreview ? "w-0 p-0" : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn("lg:px-10", isPreview ? "w-full mx-auto lg:w-4/5" : "w-1/2 lg:blok")}>
                                        {isPreview ?
                                            (
                                                <>
                                                    <div className="relative h-80 mt-5 border rounded-md">
                                                        <Image src={form.getValues().image_url} alt="preview" fill
                                                            className="object-cover object-center rounded-md"
                                                        />
                                                    </div>
                                                </>
                                            )
                                            : (
                                                <>画像プレビューを表示</>
                                            )}
                                    </div>
                                </div>
                            </FormControl>
                            {form.getFieldState("image_url").invalid && form.getValues().image_url && (
                                <div className="p-2">
                                    <FormMessage />
                                </div>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? "divide-x-0" : "divide-x h-70vh")}>
                                    <Textarea placeholder="記事内容を入力" {...field}
                                        className={cn("border-none text-lg font-medium leading-relaxed resize-none",
                                            isPreview ? "w-0 p-0" : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn("overflow-y-auto", isPreview ? "w-full mx-auto lg:w-4/5" : "w-1/2 lg:blok")}>
                                        <MarkDown content={form.getValues().content} />
                                    </div>
                                </div>
                            </FormControl>
                            {form.getFieldState("content").invalid && form.getValues().content && <FormMessage />}
                        </FormItem>
                    )}
                />
                <Button type="submit">記事を公開</Button>
            </form>
        </Form>
    )
}
