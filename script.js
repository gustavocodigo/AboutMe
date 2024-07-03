const mario_states = {
    RUNNING_LEFT: "rl",
    FALL_DOWN: "fd",
    SPEEDER_MAN: "spm"
}

class Mario {
    constructor(name, el) {
        this.positionX = 0;
        this.positionY = 0;
        this.speedX = 4;
        this.speedY = 0;
        this.marioEl = el || document.getElementById('mario');
        this.mario = this.marioEl.cloneNode(true);
        this.mario.style.display = "block";
        this.state = mario_states.RUNNING_LEFT;
        this.header = document.getElementById("header");

        // Set initial position
        this.mario.style.top = this.header.getBoundingClientRect().top + "px";
        this.mario.style.left = this.header.getBoundingClientRect().left + "px";

        if (name) this.mario.childNodes[1].innerText = name;
        this.card = document.getElementById("cartao");
        document.body.appendChild(this.mario); // Append to body instead of the parent of marioEl
    }

    tick() {
        switch (this.state) {
            case mario_states.RUNNING_LEFT:
                if (this.positionX > this.header.clientWidth - 50) {
                    this.state = mario_states.FALL_DOWN;
                }
                break;

            case mario_states.FALL_DOWN:
                this.speedY += 2;
                if (this.positionY > 320) {
                    this.state = mario_states.SPEEDER_MAN;
                    this.speedY = 0;
                    this.speedX = -4;
                }
                break;
        }

        return this.updateMario();
    }

    updateMario() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        const dir = this.speedX < 0 ? -1 : 1;

        this.mario.style.top = this.header.getBoundingClientRect().top + 8 + "px";
        this.mario.style.left = this.header.getBoundingClientRect().left + "px";
        this.mario.childNodes[1].style.transform = "scaleX(" + dir + ")";
        this.mario.style.transform = "scaleX(" + dir + ") translate(" + this.positionX * dir + "px, " + this.positionY + "px)";

        const out = this.positionX < -800; // Use this.positionX instead of this.mario.positionX
        if (out) this.mario.remove(); // Use .remove() to remove the element

        return out;
    }
}









function typewriterEffect(text, element) {
    let i = 0;
    const speed = 10; // Velocidade de digitação (em milissegundos)

    function type() {
        if (i < text.length) {

            element.innerText += text.charAt(i) + (".").repeat();
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}




const preload_animated_characters = async () => {
    const marios = [];

    function update() {
        marios.forEach(mario => {
            if (mario.tick()) {
                const index = marios.indexOf(mario);
                if (index !== -1) {
                    marios.splice(index, 1);
                }
            }
        });

        requestAnimationFrame(update);
    }


    setTimeout(() => {
        const initialMario = new Mario("KNOWLEDGE", document.getElementById("pitchy"));
        marios.push(initialMario);
    }, 300);
    setTimeout(() => {
        update();
    }, 600)

    const tp = new Promise((resolve) => setTimeout(resolve, 2000))
    await tp;




    setTimeout(() => {
        marios.push(new Mario("Gustavo"));
    }, 1000);




};

setTimeout(() => {
    preload_animated_characters()

}, 2000);







document.querySelector("#about-button").onclick = function () {

    var modal = document.getElementById('modal-sample');
    modal.style.display = 'block';
    setTimeout(() => {
        document.getElementById("close-about-modal-button").onclick = () => {
            modal.style.display = 'none';
        }
    }, 100)


}




async function getUserRepositories(username) {
    const rawdata = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos`)
    const data = await rawdata.json();
    return data;
}


function fetchrepos() {
    try {
        getUserRepositories("gustavocodigo").then(list => {
            const listhtml = [];
            list.forEach(repo => {
                listhtml.push(`
         

                <div class="card">

<div style="position: relative;">
<img style="position: relative;"class="card-img-top" height=48 src="./assets/faixa.png" alt="Card image cap">
<div style="font-size: 1.2em; color: white;position: absolute; top: calc(50% - 0.2em); left: 50%; max-width: 90%; transform: translate(-50%,-50%);text-shadow: 2px 0 #fff, -2px 0 #000, 0 2px #000, 0 -2px #000,1px 1px #00, -1px -1px #000, 1px -1px #000, -1px 1px #000;">

<a style="color:white" href="${repo.html_url}">
${repo.name}
</a>
</div>
</div>
  <div class="card-body">
    <p class="card-text">${repo.description}</p>
  </div>
</div>
                `)
            })

            document.getElementById("repos").innerHTML = `

            <div class="projects-github-list">
            ${listhtml.join("")}
        
            </div>`

        })
    } catch (e) {
        document.getElementById("repos").innerHTML = `<div style="">
        ${e.toString()}
        </div>`
    }

}


function toggleMobileMenu() {
    if (document.getElementById("menu-mobile").style.display == "none")
        document.getElementById("menu-mobile").style.display = "flex"
    else {
        document.getElementById("menu-mobile").style.display = "none"
    }
}

document.getElementById("h-icon").onclick = function () {
    toggleMobileMenu();
}


document.querySelector(".avatar").style.left = "500px";
document.querySelector(".avatar").style.opacity = "0";


setTimeout(function () {
    $(".avatar").animate({ left: '0px', opacity: 1 });

}, 2000)











function goto(tabname) {

    if (document.getElementById("menu-mobile")) {
        document.getElementById("menu-mobile").style.display = "none"
    }


    document.getElementById("dk-aboutme-btn").classList.remove("selected-element");
    document.getElementById("dk-stacks-btn").classList.remove("selected-element");
    document.getElementById("dk-github-btn").classList.remove("selected-element");
    document.getElementById("dk-contact-btn").classList.remove("selected-element");



    document.getElementById("dk-" + tabname + "-btn").classList.add("selected-element");



    document.getElementById("top-title-mb").innerText = document.getElementById("dk-"+tabname+"-btn").innerText





    const tabs = ["aboutme", "stacks", "github", "contact"];

    document.getElementById("loading-icon").style.display = "flex"

    tabs.forEach(e => {
        document.getElementById(e).classList.remove("visible");
    })

    setTimeout(() => {
        tabs.forEach(e => {
            document.getElementById(e).style.display = "none";
        })
        document.getElementById(tabname).style.display = "flex";

    }, 2000)



    setTimeout(() => {
        setTimeout(() => {
            document.getElementById(tabname).classList.add("visible");
            document.getElementById("loading-icon").style.display = "none"

            if (tabname == "github") {
                fetchrepos()
            }
        }, 100)
    }, 2100)
}


goto("aboutme")



document.getElementById("send-contact-msg-button").onclick=function() {
    alert("Não foi possivel enviar uma mensagem de contato, pois o servidor está fora do AR, considere outros meios de contato.")
}