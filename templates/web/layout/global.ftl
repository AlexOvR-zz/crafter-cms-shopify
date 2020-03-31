<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#macro renderHeader>
    <!-- Main Nav Container Starts -->
    <nav id="main-nav">
        Header Soon Here...
        <!-- Logo -->
        <a href="#">
            <!-- <img src="" class="nav-logo" alt="rivet-logo"/> -->
        </a>
        <!-- Menu Navigation -->
        <div class="nav-menu">
            <div class="nav">
            </div>	
        </div>
    </nav>
    <!-- Main Nav Container Ends -->
</#macro>

<#macro renderFooter>
    <!-- Footer Container Starts -->
    <footer id="page-footer" <@studio.iceAttr iceGroup="page-footer"/>>
        Footer Soon Here...
    </footer>
    <!-- Footer Container Ends -->
</#macro>

<#macro renderHero>
    <@renderComponent component = contentModel.hero_o.item />
</#macro>