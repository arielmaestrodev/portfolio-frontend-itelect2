import { blogService } from "@/services/blog.service";
import { BlogCategoryContent } from "@/components/features/blog/BlogCategoryContent";

type Props = { params: Promise<{ slug: string[] }> };

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const activeCategories = slug || [];
  
  // URL decode the category to handle spaces and special chars
  const mainCategory = decodeURIComponent(activeCategories[activeCategories.length - 1]);
  
  let filteredPosts = [];
  try {
    const response = await blogService.getAll();
    if (response.code === 200) {
      filteredPosts = response.data.filter((post: any) => 
        post.category.some((cat: string) => cat.toLowerCase() === mainCategory.toLowerCase())
      );
    }
  } catch (error) {
    console.error("Error fetching category posts:", error);
  }

  return (
    <BlogCategoryContent 
      activeCategories={activeCategories.map(c => decodeURIComponent(c))}
      filteredPosts={filteredPosts}
      mainCategory={mainCategory}
    />
  );
}