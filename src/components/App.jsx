import React, { Component } from "react";
import './App.css';
import Searchbar from './Searchbar';
import Notiflix from "notiflix";
import fetchImages from "./fetchImages/fetchImages";
import 



class App extends Component {

  state = {
    inputData: '',
    items: [],
    status: 'idle',
    totalHits:0,
  };

  handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      Notyflix.Notyfy.info('You cannot search by empty field, try again.');
      return;
    } else { 
      try { 
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notyflix.Notyfy.failure('Sorry, there are no images matching your search query. Please try again.');
        } else { 
          this.setState({
            inputData,
    items: hits,
    status: 'resolved',
    totalHits:totalHits,
          });
        }
      } catch (error) { 
        this.setState({ staus: 'rejected' });
      }
    }
   };

  onNextPage = async () => { 
    this.setState({ status: 'pending' });

    try { 
      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }))
    } catch (error) {
      this.setState({status:'rejected'});
     }
  };

  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') { 
      return (
        <div className="App">
          <Searchbar onSubmit={ this.handleSubmit} />
   </div>
 );
}
   
    if (status === 'pending') { 
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={ this.onNextPage} />}          
   </div>
 );
    }

    if (status === 'rejected') { 
 return ();

    }
    
    if (status === 'resolved') { 
 return ();

    }

   };

}

export default App;
