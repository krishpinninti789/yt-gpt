type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;

  return <div>Search page: {q}</div>;
};

export default SearchPage;
