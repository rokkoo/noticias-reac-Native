import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

//Importamos la funcion getNews 
import { getNews } from "./src/news";

//Importamos el componente
import Article from "./src/components/Article.js";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { articles: [], refreshing: true }
    this.fetchNews = this.fetchNews.bind(this)
  }

  //Se le llama despues de que el componente se monte
  componentDidMount() {
    this.fetchNews();
  }

  //Cargamos las nuevas noticias
  fetchNews() {
    getNews()
    .then( articles => this.setState({ articles, refreshing:false }))
    .catch(() => this.setState({ refreshing:false }))
  }

  //Se encarga de hacer el refresco
  //handleRefresh starts the spinner animation and call fetchNews(). 
  //We pass () => this.fetchNews() , so it’s called immediately after we assign the state.
  handleRefresh() {
    this.setState({refreshing: true}, () => this.fetchNews())
  }
  render() {
    return (
      <FlatList 
        data={this.state.articles}
        renderItem={({item}) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
