
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from 'src/components/Loading/Loading';
import NotFound from 'src/pages/NotFound/NotFound';

const Home = lazy(() => import('src/pages/Home/Home'));
const PodcastDetail = lazy(() => import('src/pages/PodcastDetail/PodcastDetail'));
const PodcastEpisodeDetail = lazy(() => import('src/pages/PodcastEpisodeDetail/PodcastEpisodeDetail'));
const EpisodesList = lazy(() => import('src/components/EpisodesList/EpisodesList'));


const AppRoutes = () => {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="/podcast/:podcastId"
                element={
                    <Suspense fallback={<Loading />}>
                        <PodcastDetail />
                    </Suspense>
                }
            >
                <Route index element={<EpisodesList />} />
                <Route path="episode/:episodeId" element={<PodcastEpisodeDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
