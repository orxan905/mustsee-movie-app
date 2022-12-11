let initState = {
    movies: [],    
    arr:[],
    value: '',
    listName:''
}

export const fetcher = (val) => { 
    return function(dispatch){      
        fetch(`https://www.omdbapi.com/?apikey=8e81bb0&s=${val}`)
        .then(res => res.json())
        .then((data) =>{ 
            dispatch({type:'FIND_MOVIE', payload:data.Search})
     })
    }
}

export const reducer = (state = initState,action) => {

    switch(action.type){
        case 'ADD_MOVIE':  
        let newMovie = state.movies.find((item) => {
            return item.imdbID === action.payload
          }
        )
        let arr = [...state.arr] 
        if(!state.arr.includes(newMovie)){
           arr = [...state.arr, newMovie]            
        }      
        return {...state,arr}

        case 'DELETE_MOVIE':
            return {...state, arr:state.arr.filter((item) => item.imdbID !== action.payload)}
        case 'GET_LIST_MOVIE':    
                return  {...state,listName:action.payload} 
        case 'SEARCH_MOVIE':              
            return  {...state,value:action.payload}
            
        case 'FIND_MOVIE':         
            console.log(state.movies)
            return {...state, movies: [...action.payload]}
          
    }
    return state
}