const template =
`
<nav class="navbar navbar-expand-sm navbar-light bg-light fixed-top " id="navigator">

    <div class="container-fluid">

        <a class="navbar-brand">
            <span @click="window.location.reload()" style="cursor: pointer; ">
                <img :src="ui.loading ? C.URLS.pic.loading : C.URLS.pic.logo"
                     style="width: 1.2em; height: 1.2em;"
                     class="mq_avatar" alt=""/>
                <span style="font-size: 0.8em">{{ ui.loading ? '更新中' : C.LOCATIONS.getCity(locator) }}</span>
            </span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigator_body" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navigator_body">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <a  class="nav-link " style="font-weight: bold" role="button" 
                        @click="ui.modal.info = true" >
                        info
                    </a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link " style="font-weight: bold" role="button"                         
                       @click="ui.modal.config = true" >
                        设置
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" style="font-weight: bold" href="#"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        城市
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a v-for="(city, code) in C.LOCATIONS.getCities(locator)"
                               href="#"
                               class="dropdown-item"
                               v-on:click="locator.city = code"
                               v-bind:class="{'active': code === locator.city }"
                            >
                                {{ city }}
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" style="font-weight: bold" href="#"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        排序
                    </a>
                    <ul class="dropdown-menu" >

                        <li>
                            <a class="dropdown-item" href="#" v-bind:class="{'active': filter.order.dir === 'desc'  }"
                               v-on:click="filter.order.dir = 'desc'">倒序</a>
                        </li>
                        <li><a class="dropdown-item" href="#" v-bind:class="{'active': filter.order.dir !== 'desc' }"
                               v-on:click="filter.order.dir = 'asc'">正序</a>
                        </li>

                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" style="font-weight: bold" href="#"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        其他
                    </a>
                    <ul class="dropdown-menu" >                        
                        <li><a class="dropdown-item" href="#" v-on:click="window.localStorage.clear();">清除缓存</a></li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" style="font-weight: bold" href="#"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        联系
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a class="dropdown-item" href="#"
                               @click="window.open('https://hegel.net');">
                               Hegel
                            </a>
                        </li>                                                                                 
                    </ul>
                </li>


                <li class="nav-item dropdown" v-if="mode.ctrl">
                    <a class="nav-link dropdown-toggle" style="font-weight: bold" href="#"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        控
                    </a>
                    <ul class="dropdown-menu" >
                        <li><a class="dropdown-item" href="#" @click="hub.go('ctrl.config')">设置</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
`;


async function init() {
    const Comp = {};
    Comp.name = 'play-nav';
    Comp.template = template;

    const { mapState } = window['Vuex'];
    Comp.computed = {

        ...mapState([
            'C',
            'locator', 'mode', 'config', 'tree', 'filter', 'hub', 'ui',
        ])
    };

    Comp.mounted = function() {

    };

    return Comp;
}


export default init;