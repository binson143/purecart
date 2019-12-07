var routes = [
  {
    path: "home",
    template: "home",
    data: ()=>{return {
      title: 'JavaScript Templates',
      license: {
        name: 'MIT license',
        url: 'https://opensource.org/licenses/MIT'
      },
      features: ['lightweight & fast', 'powerful', 'zero dependencies']
    }}
  },
  {
    path: "products",
    template: "products",
    data: ()=>{return {}}
  },
  {
    path: "cart",
    template: "cart",
    data: ()=>{return {}}
  }
];

