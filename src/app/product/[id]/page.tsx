import { Metadata } from 'next';
import { ProductDetail } from '@/components/features/ProductDetail';
import { mockProducts } from '@/hooks/useProducts';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - E-commerce Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 600,
          height: 400,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
