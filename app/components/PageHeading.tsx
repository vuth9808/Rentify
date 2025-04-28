'use client';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle
}) => {
  return ( 
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
   );
}

export default PageHeading; 