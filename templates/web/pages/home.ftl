<#import "/templates/web/layout/global.ftl" as global/>
<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />

<!DOCTYPE html>
<html lang="en">
<@layout.default />
<body>
	<div id="home-main-container" class="main-container">
    	<@global.renderHero />
        <@global.renderHeader />
      	<div class="sections-container">
        </div>
        <@global.renderFooter />
	</div>

    <@layout.defaultScripts />
    <@studio.toolSupport/>
</body>
</html>