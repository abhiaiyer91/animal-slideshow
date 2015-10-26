AnimalButton = class AnimalButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="btn btn-success">{this.props.name}</button>
    )
  }
};

var animals = [
  {
    _id: Random.id(),
    'name': 'Lion'
  },
  {
    _id: Random.id(),
    'name': 'Wolf'
  },
  {
    _id: Random.id(),
    'name': 'Bear'
  },
  {
    _id: Random.id(),
    'name': 'Gorilla'
  }
];

Animal = class Animal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      animals: animals,
      currentAnimal: animals[Math.floor(Math.random() * animals.length)].name
    };
    this.handleClickNext = this.handleClickNext.bind(this);
  }
  handleClickNext(event) {
    this.setState({currentAnimal: event.currentTarget.innerText});
  }
  render() {
    var currentAnimal = this.state.currentAnimal;
    var renderedAnimal;
    switch (currentAnimal) {
      case 'Lion':
        renderedAnimal = <LionArt/>
        break;
      case 'Wolf':
        renderedAnimal = <WolfArt/>
        break;
      case 'Bear':
        renderedAnimal = <BearArt/>
        break;
      case 'Gorilla':
        renderedAnimal = <GorillaArt/>
        break;
      default:
        renderedAnimal = <WolfArt/>
    }
    var animalButtons = _.map(this.state.animals, _.bind(function (animal) {
      return <AnimalButton onClick={this.handleClickNext} key={animal._id} name={animal.name}/>
    }, this));
    return (
      <div class="container">
        <br/>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-6 col-xs-12">
            <div className="btn-group pull-right">
              {animalButtons}
            </div>
          </div>
          <div className="col-sm-12 col-xs-12">
            <h1 className="text-center">The Animal Slideshow</h1>
          </div>
        </div>
        {renderedAnimal}
      </div>
    );
  }
};

