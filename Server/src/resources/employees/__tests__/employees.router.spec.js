import router from '../employees.router'

//TEST THE ROUTING
describe('employees router', () => {
  test('has crud routes', () => {
    
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' }
    ]

    console.log('test');
    console.log(routes);

    routes.forEach(route => {
      
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})
