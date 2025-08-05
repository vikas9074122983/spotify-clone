import Topbar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState, useMemo } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import SearchBar from "@/components/SearchBar";


const HomePage = () => {
  const {
	fetchFeaturedSongs,
	fetchMadeForYouSongs,
	fetchTrendingSongs,
	fetchSongs,
	fetchAlbums,
	isLoading,
	madeForYouSongs,
	featuredSongs,
	trendingSongs,
	songs,
	albums,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
	fetchFeaturedSongs();
	fetchMadeForYouSongs();
	fetchTrendingSongs();
	fetchSongs();
	fetchAlbums();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, fetchSongs, fetchAlbums]);

  useEffect(() => {
	if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
	  const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
	  initializeQueue(allSongs);
	}
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  const filteredSongs = useMemo(() => {
	if (!search.trim()) return songs;
	const q = search.toLowerCase();
	return songs.filter(
	  (song) =>
		song.title.toLowerCase().includes(q) ||
		song.artist.toLowerCase().includes(q)
	);
  }, [search, songs]);

  const filteredAlbums = useMemo(() => {
	if (!search.trim()) return albums;
	const q = search.toLowerCase();
	return albums.filter(
	  (album) =>
		album.title.toLowerCase().includes(q) ||
		album.artist.toLowerCase().includes(q)
	);
  }, [search, albums]);

  return (
	<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
	  <Topbar />
	  <ScrollArea className='h-[calc(100vh-180px)]'>
		<div className='p-4 sm:p-6'>
		  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
			<h1 className='text-2xl sm:text-3xl font-bold'>
			  {(() => {
				const hour = new Date().getHours();
				if (hour < 12) return "Good morning";
				if (hour < 18) return "Good afternoon";
				return "Good evening";
			  })()}
			</h1>
			<SearchBar onSearch={setSearch} />
		  </div>
		  {search.trim() ? (
			<>
			  <div className='mb-8'>
				<h2 className='text-xl sm:text-2xl font-bold mb-4'>Songs</h2>
				<SectionGrid title='' songs={filteredSongs} isLoading={isLoading} />
			  </div>
			  <div className='mb-8'>
				<h2 className='text-xl sm:text-2xl font-bold mb-4'>Albums</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				  {filteredAlbums.map((album) => (
					<div key={album._id} className='bg-zinc-800/40 p-4 rounded-md'>
					  <img src={album.imageUrl} alt={album.title} className='w-full h-40 object-cover rounded mb-2' />
					  <h3 className='font-medium mb-1 truncate'>{album.title}</h3>
					  <p className='text-sm text-zinc-400 truncate'>{album.artist}</p>
					</div>
				  ))}
				</div>
			  </div>
			</>
		  ) : (
			<>
			  <FeaturedSection />
			  <div className='space-y-8'>
				<SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={isLoading} />
				<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
			  </div>
			</>
		  )}
		</div>
	  </ScrollArea>
	</main>
  );
};
export default HomePage;
