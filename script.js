let Img = document.querySelector('#myImage');
let ZoomContainer , ZoomLens , ZoomResult , ImgBox ;



Img.addEventListener('mouseenter' , function(e){
    ImgBox = Img.getBoundingClientRect();

    ZoomContainer = document.createElement('div');
    ZoomContainer.classList.add('zoom-container');
    ZoomContainer.style.width = `${ImgBox.width}px`;
    ZoomContainer.style.height = `${ImgBox.height}px`;
    ZoomContainer.style.position = 'absolute';
    ZoomContainer.style.top = `${ImgBox.top + window.scrollY}px`;
    ZoomContainer.style.left = `${ImgBox.left + window.scrollX}px`;

    ZoomLens = document.createElement('div');
    ZoomLens.classList.add('img-zoom-lens')
    ZoomResult = document.createElement('div');
    ZoomResult.classList.add('img-zoom-result');
    ZoomResult.style.position = 'absolute';
    ZoomResult.style.top = `${ImgBox.bottom + window.scrollY}px`
    console.log(ZoomResult)

    ZoomContainer.insertAdjacentElement('afterbegin' ,ZoomLens);
    ZoomContainer.insertAdjacentElement('afterbegin' , ZoomResult);
    document.querySelector('body').insertAdjacentElement('beforeend' , ZoomContainer)

    let cx = ZoomResult.offsetWidth / ZoomLens.offsetWidth ;
    let cy = ZoomResult.offsetHeight / ZoomLens.offsetHeight;

    ZoomResult.style.backgroundImage = `url('${Img.src}') `;
    ZoomResult.style.backgroundSize = `${Img.width * cx}px ${Img.height * cy}px`;


    ZoomContainer.addEventListener('mousemove' , function(e){
        let x = e.clientX - ImgBox.left;
        let y = (e.clientY + window.scrollY) - ImgBox.top;
        console.log(y);
        
        x = x - (ZoomLens.offsetWidth/2);
        y = y - (ZoomLens.offsetHeight/2);

        if(x> Img.width-ZoomLens.offsetWidth){x=Img.width-ZoomLens.offsetWidth};
        if(x<0){x=0};
        if(y> Img.height-ZoomLens.offsetHeight) {y = Img.height-ZoomLens.offsetHeight}
        if (y<0) {y=0}
       

        ZoomLens.style.top = `${y}px`;
        ZoomLens.style.left = `${x}px`;

        ZoomResult.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    })


})