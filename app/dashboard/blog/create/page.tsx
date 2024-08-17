"use client";
import { toast } from '@/components/ui/use-toast';
import BlogForm from '../../components/BlogForm';
import { BlogFormSchemaType } from '../../schema';
import { createBlog } from '@/lib/actions/blog';

const page = () => {
    const handleCreate = async (data: BlogFormSchemaType) => {
        const result = await createBlog(data);
        if ("error" in result) {
            toast({
                title: "ブログの作成に失敗しました",
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{result.error}</code>
                    </pre>
                ),
            });
        } else {
            toast({
                title: data.title + "の作成に成功しました",
            });
        }
    }

    return (
        <BlogForm onHandleSubmit={handleCreate} />
    );
}

export default page
