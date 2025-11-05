module.exports=[93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},40507,(e,t,r)=>{},64196,e=>{"use strict";e.s(["handler",()=>M,"patchFetch",()=>P,"routeModule",()=>b,"serverHooks",()=>C,"workAsyncStorage",()=>T,"workUnitAsyncStorage",()=>S],64196);var t=e.i(47909),r=e.i(74017),a=e.i(96250),s=e.i(59756),n=e.i(61916),o=e.i(69741),i=e.i(16795),l=e.i(87718),d=e.i(95169),p=e.i(47587),u=e.i(66012),c=e.i(70101),h=e.i(26937),m=e.i(10372),x=e.i(93695);e.i(52474);var g=e.i(220);e.s(["POST",()=>w],65930);var v=e.i(89171),f=e.i(29508),R=e.i(66545);let y=new Map;async function w(e){try{let t=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",r=Date.now(),a=(y.get(t)||[]).filter(e=>r-e<6e4);if((0,R.isRateLimited)(a,6e4,3))return v.NextResponse.json({error:"Too many requests. Please try again later."},{status:429});a.push(r),y.set(t,a);let s=await e.json(),n=(0,R.validateContactForm)(s);if(!n.success)return v.NextResponse.json({error:"Validation failed",details:n.error.issues.map(e=>({field:e.path.join("."),message:e.message}))},{status:400});let o=n.data,i={name:(0,R.sanitizeString)(o.name),email:(0,R.sanitizeEmail)(o.email),phone:(0,R.sanitizePhone)(o.phone),message:(0,R.sanitizeString)(o.message),timestamp:o.timestamp},l=f.default.createTransport({host:process.env.SMTP_HOST,port:parseInt(process.env.SMTP_PORT||"587"),secure:"true"===process.env.SMTP_SECURE,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},tls:{rejectUnauthorized:!1}}),d=`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Message - Gourd Shades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              New Contact Message
            </h1>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${i.name}</p>
              <p><strong>Email:</strong> ${i.email}</p>
              <p><strong>Phone:</strong> ${i.phone}</p>
              <p><strong>Date:</strong> ${new Date(i.timestamp).toLocaleString()}</p>
            </div>

            <div style="margin: 20px 0;">
              <h2 style="color: #1a1a1a;">Message</h2>
              <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${i.message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              <p>This message was sent from the Gourd Shades contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `,p={from:process.env.SMTP_FROM||process.env.SMTP_USER,to:process.env.ENQUIRY_EMAIL||process.env.SMTP_USER,subject:`New Contact Message from ${i.name}`,html:d,replyTo:i.email};await l.sendMail(p);let u=`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Message Received - Gourd Shades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              Thank You for Contacting Us
            </h1>
            
            <p>Dear ${i.name},</p>
            
            <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Your Message</h2>
              <p style="white-space: pre-wrap;">${i.message}</p>
            </div>
            
            <p>If you have any urgent questions, please don't hesitate to call us at +255 746 754 878.</p>
            
            <p>Best regards,<br>The Gourd Shades Team</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              <p>This is an automated confirmation email from Gourd Shades.</p>
            </div>
          </div>
        </body>
      </html>
    `,c={from:process.env.SMTP_FROM||process.env.SMTP_USER,to:i.email,subject:"Thank you for contacting Gourd Shades",html:u};return await l.sendMail(c),v.NextResponse.json({success:!0,message:"Contact message sent successfully"},{status:200})}catch(e){return console.error("Error sending contact message:",e),v.NextResponse.json({error:"Failed to send contact message"},{status:500})}}var E=e.i(65930);let b=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/send-contact/route",pathname:"/api/send-contact",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/send-contact/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:T,workUnitAsyncStorage:S,serverHooks:C}=b;function P(){return(0,a.patchFetch)({workAsyncStorage:T,workUnitAsyncStorage:S})}async function M(e,t,a){var v;let f="/api/send-contact/route";f=f.replace(/\/index$/,"")||"/";let R=await b.prepare(e,t,{srcPage:f,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:y,params:w,nextConfig:E,isDraftMode:T,prerenderManifest:S,routerServerContext:C,isOnDemandRevalidate:P,revalidateOnlyGenerated:M,resolvedPathname:A}=R,N=(0,o.normalizeAppPath)(f),_=!!(S.dynamicRoutes[N]||S.routes[A]);if(_&&!T){let e=!!S.routes[A],t=S.dynamicRoutes[N];if(t&&!1===t.fallback&&!e)throw new x.NoFallbackError}let k=null;!_||b.isDev||T||(k="/index"===(k=A)?"/":k);let j=!0===b.isDev||!_,O=_&&!j,q=e.method||"GET",U=(0,n.getTracer)(),I=U.getActiveScopeSpan(),D={params:w,prerenderManifest:S,renderOpts:{experimental:{cacheComponents:!!E.experimental.cacheComponents,authInterrupts:!!E.experimental.authInterrupts},supportsDynamicResponse:j,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(v=E.experimental)?void 0:v.cacheLife,isRevalidate:O,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>b.onRequestError(e,t,a,C)},sharedContext:{buildId:y}},H=new i.NodeNextRequest(e),$=new i.NodeNextResponse(t),F=l.NextRequestAdapter.fromNodeNextRequest(H,(0,l.signalFromNodeResponse)(t));try{let o=async r=>b.handle(F,D).finally(()=>{if(!r)return;r.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=U.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=a.get("next.route");if(s){let e=`${q} ${s}`;r.setAttributes({"next.route":s,"http.route":s,"next.span_name":e}),r.updateName(e)}else r.updateName(`${q} ${e.url}`)}),i=async n=>{var i,l;let d=async({previousCacheEntry:r})=>{try{if(!(0,s.getRequestMeta)(e,"minimalMode")&&P&&M&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await o(n);e.fetchMetrics=D.renderOpts.fetchMetrics;let l=D.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=D.renderOpts.collectedTags;if(!_)return await (0,u.sendResponse)(H,$,i,D.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(i.headers);d&&(t[m.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==D.renderOpts.collectedRevalidate&&!(D.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&D.renderOpts.collectedRevalidate,a=void 0===D.renderOpts.collectedExpire||D.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:D.renderOpts.collectedExpire;return{value:{kind:g.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await b.onRequestError(e,t,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:O,isOnDemandRevalidate:P})},C),t}},x=await b.handleResponse({req:e,nextConfig:E,cacheKey:k,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:M,responseGenerator:d,waitUntil:a.waitUntil});if(!_)return null;if((null==x||null==(i=x.value)?void 0:i.kind)!==g.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==x||null==(l=x.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,s.getRequestMeta)(e,"minimalMode")||t.setHeader("x-nextjs-cache",P?"REVALIDATED":x.isMiss?"MISS":x.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let v=(0,c.fromNodeOutgoingHttpHeaders)(x.value.headers);return(0,s.getRequestMeta)(e,"minimalMode")&&_||v.delete(m.NEXT_CACHE_TAGS_HEADER),!x.cacheControl||t.getHeader("Cache-Control")||v.get("Cache-Control")||v.set("Cache-Control",(0,h.getCacheControlHeader)(x.cacheControl)),await (0,u.sendResponse)(H,$,new Response(x.value.body,{headers:v,status:x.value.status||200})),null};I?await i(I):await U.withPropagatedContext(e.headers,()=>U.trace(d.BaseServerSpan.handleRequest,{spanName:`${q} ${e.url}`,kind:n.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},i))}catch(t){if(t instanceof x.NoFallbackError||await b.onRequestError(e,t,{routerKind:"App Router",routePath:N,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:O,isOnDemandRevalidate:P})}),_)throw t;return await (0,u.sendResponse)(H,$,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__72e94c77._.js.map