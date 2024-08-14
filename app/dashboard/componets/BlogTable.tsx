import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const BlogTable = () => {
    const Actions = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button variant="outline">表示</Button>
                <Button variant="outline">編集</Button>
                <Button variant="outline">削除</Button>
            </div>
        );
    }

    return (
        <div className="border bg-gradient-dark rounded-md overflow-x-auto">
            <div className="min-w-[640px]">
                <div className="grid grid-cols-5 p-4 text-gray-500 border-b">
                    <h1 className="col-span-2">記事タイトル</h1>
                    <h1>Premium</h1>
                    <h1>Free</h1>
                    <h1>操作</h1>
                </div>
                <div className="grid grid-cols-5 p-4 items-center">
                    <h1 className="col-span-2 font-semibold">記事タイトル例</h1>
                    <div className="flex items-center"><Switch /></div>
                    <div className="flex items-center"><Switch /></div>
                    <Actions />
                </div>
            </div>
        </div>
    );
}

export default BlogTable