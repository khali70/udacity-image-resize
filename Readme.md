# scripts

to start the script 

**install modules**
```
npm install
```
**to start the dev server**
```sh
npm run dev # http://localhost:3000/resize?filename=palmtunnel&width=200&height=200
```
open the link at [/resize](http://localhost:3000/resize?filename=palmtunnel&width=200&height=200)

ex.

http://localhost:3000/resize?filename=palmtunnel&width=200&height=200

where 
- `filename` is [ 'encenadaport' , 'fjord' , 'icelandwaterfall' , 'palmtunnel' , 'santamonica']
- `width` 
- `height`

**to run linting**
```sh
npm run lint # for linting
npm run lint:fix

npm run format # for prettier formatting
```

# testing 
for testing we use jasmine to test run 

```
npm run test
```

