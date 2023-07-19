
const requestsMovie ={
    fetchTrending:
    {
        url:`/trending/all/week?language=vi-VN`,
        url_tv :`/trending/tv/week?language=vi-VN`,
        url_movie:`/trending/movie/week?language=vi-VN`,
        title : "Trending_Now"
    },
    fetchTopRated :
    {
        url:`/movie/top_rated?language=vi-VN'`,
        url_tv : `/tv/top_rated?language=vi-VN'`,
        url_movie :`/movie/top_rated?language=vi-VN'`,
        title:'Top_Rated'
    },
    fetchActionMovies: 
    {
        url : `/discover/movie?&with_genres=28&language=vi-VN`,
        url_tv:`/discover/tv?&with_genres=10759&language=vi-VN`,
        url_movie :`/discover/movie?&with_genres=28&language=vi-VN`,
        title: 'Action_Thrillers',
        genner : {
            genner_movie :28,
            genner_tv : 10759
        }
    },
    fetchComedyMovies: 
    {
        url :`/discover/tv?&with_genres=16&language=vi-VN`,
        url_tv :`/discover/tv?&with_genres=16&language=vi-VN`,
        url_movie :`/discover/movie?&with_genres=35&language=vi-VN`,
        title: 'Comedies',
        genner : {
            genner_movie:35,
            genner_tv:35
        }
    }, 
    fetchHorrorMovies:
    {
        url: `/discover/movie?&with_genres=27&language=vi-VN`,
        url_tv: `/discover/tv?&with_genres=10764&language=vi-VN`,
        url_movie: `/discover/movie?&with_genres=27&language=vi-VN`,
        title: 'Scary',
        genner: {
            genner_movie: 27,
            genner_tv: 10764
        }
    },
    fetchRomanceMovies: 
    {
        url: `/discover/tv?&with_genres=18&language=vi-VN`,
        url_tv: `/discover/tv?&with_genres=18&language=vi-VN`,
        url_movie: `/discover/movie?&with_genres=10749&language=vi-VN`,
        title: 'Romance',
        genner: {
            genner_movie: 10749,
            genner_tv:10766
        }
    }, 
    fetchDocumentaries: {
        url: `/discover/movie?&with_genres=99&language=vi-VN`,
        url_tv: `/discover/tv?&with_genres=99&language=vi-VN`,
        url_movie: `/discover/movie?&with_genres=99&language=vi-VN`,
        title :'Documentaries',
        genner : {
            genner_movie:99,
            genner_tv:99
        }
    },
    fetchCrimeMovies: {
        url :`/discover/movie?&with_genres=80&language=vi-VN`,
        url_tv :`/discover/tv?&with_genres=80&language=vi-VN`,
        url_movie :`/discover/movie?&with_genres=80&language=vi-VN`,
        title: 'Crime',
        genner: {
            genner_movie:80,
            genner_tv:80
        }
    },
    fetchFamilyMovies: {
        url:`/discover/movie?&with_genres=10751&language=vi-VN`,
        url_tv:`/discover/tv?&with_genres=10751&language=vi-VN`,
        url_movie :`/discover/movie?&with_genres=10751&language=vi-VN`,
        title : 'Family',
        genner: {
            genner_movie:10751,
            genner_tv:10751
        }
    }
};

export default requestsMovie

