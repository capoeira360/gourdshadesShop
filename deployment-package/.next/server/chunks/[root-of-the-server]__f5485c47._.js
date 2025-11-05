module.exports=[93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},49275,(e,t,r)=>{},2422,e=>{"use strict";e.s(["handler",()=>C,"patchFetch",()=>q,"routeModule",()=>w,"serverHooks",()=>P,"workAsyncStorage",()=>S,"workUnitAsyncStorage",()=>T],2422);var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),o=e.i(61916),s=e.i(69741),i=e.i(16795),l=e.i(87718),d=e.i(95169),p=e.i(47587),u=e.i(66012),c=e.i(70101),h=e.i(26937),x=e.i(10372),g=e.i(93695);e.i(52474);var m=e.i(220);e.s(["POST",()=>E],34054);var y=e.i(89171),v=e.i(29508),f=e.i(66545);let R=new Map;async function E(e){try{let t=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",r=Date.now(),a=R.get(t)||[];if((0,f.isRateLimited)(a))return y.NextResponse.json({error:"Too many requests. Please try again later."},{status:429});a.push(r),R.set(t,a.slice(-10));let n=await e.json(),o=(0,f.validateEnquiry)(n);if(!o.success)return y.NextResponse.json({error:"Validation failed",details:o.error.issues.map(e=>({field:e.path.join("."),message:e.message}))},{status:400});let s=o.data,i={...s,name:(0,f.sanitizeString)(s.name),email:(0,f.sanitizeEmail)(s.email),phone:s.phone?(0,f.sanitizePhone)(s.phone):void 0,message:(0,f.sanitizeString)(s.message)};if(!process.env.SMTP_USER||!process.env.SMTP_PASS)return console.error("Missing email configuration"),y.NextResponse.json({error:"Email service not configured"},{status:500});let l=v.default.createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:"true"===process.env.SMTP_SECURE,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},tls:{rejectUnauthorized:!1}}),d=i.items.map(e=>`
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${e.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${e.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${e.price.toFixed(2)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(e.price*e.quantity).toFixed(2)}</td>
        </tr>
      `).join(""),p=`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Enquiry - Gourdshades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              New Product Enquiry
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

            <div style="margin: 20px 0;">
              <h2 style="color: #1a1a1a;">Enquiry Items (${i.totalItems} items)</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #1a1a1a; color: white;">
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Quantity</th>
                    <th style="padding: 12px; text-align: right;">Unit Price</th>
                    <th style="padding: 12px; text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${d}
                </tbody>
                <tfoot>
                  <tr style="background-color: #f0f0f0; font-weight: bold;">
                    <td colspan="3" style="padding: 12px; text-align: right;">Total Value:</td>
                    <td style="padding: 12px; text-align: right;">$${i.totalValue.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This enquiry was submitted through the Gourdshades website.</p>
              <p>Please respond to the customer within 24 hours.</p>
            </div>
          </div>
        </body>
      </html>
    `,u={from:process.env.SMTP_FROM||process.env.SMTP_USER,to:process.env.ENQUIRY_EMAIL||process.env.SMTP_USER,subject:`New Product Enquiry from ${i.name}`,html:p,replyTo:i.email};await l.sendMail(u);let c=`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Enquiry Confirmation - Gourd Shades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              Thank You for Your Enquiry
            </h1>
            
            <p>Dear ${i.name},</p>
            
            <p>Thank you for your interest in our products. We have received your enquiry and will get back to you within 24 hours.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Your Enquiry Summary</h2>
              <p><strong>Items:</strong> ${i.totalItems}</p>
              <p><strong>Total Value:</strong> $${i.totalValue.toFixed(2)}</p>
              <p><strong>Date:</strong> ${new Date(i.timestamp).toLocaleString()}</p>
            </div>

            <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
            
            <p>Best regards,<br>The Gourdshades Team</p>
          </div>
        </body>
      </html>
    `,h={from:process.env.SMTP_FROM||process.env.SMTP_USER,to:i.email,subject:"Enquiry Confirmation - Gourdshades",html:c};return await l.sendMail(h),y.NextResponse.json({message:"Enquiry sent successfully",enquiryId:`ENQ-${Date.now()}`},{status:200})}catch(e){return console.error("Error sending enquiry:",e),y.NextResponse.json({error:"Failed to send enquiry"},{status:500})}}var b=e.i(34054);let w=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/send-enquiry/route",pathname:"/api/send-enquiry",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/send-enquiry/route.ts",nextConfigOutput:"",userland:b}),{workAsyncStorage:S,workUnitAsyncStorage:T,serverHooks:P}=w;function q(){return(0,a.patchFetch)({workAsyncStorage:S,workUnitAsyncStorage:T})}async function C(e,t,a){var y;let v="/api/send-enquiry/route";v=v.replace(/\/index$/,"")||"/";let f=await w.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!f)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,params:E,nextConfig:b,isDraftMode:S,prerenderManifest:T,routerServerContext:P,isOnDemandRevalidate:q,revalidateOnlyGenerated:C,resolvedPathname:A}=f,M=(0,s.normalizeAppPath)(v),N=!!(T.dynamicRoutes[M]||T.routes[A]);if(N&&!S){let e=!!T.routes[A],t=T.dynamicRoutes[M];if(t&&!1===t.fallback&&!e)throw new g.NoFallbackError}let _=null;!N||w.isDev||S||(_="/index"===(_=A)?"/":_);let $=!0===w.isDev||!N,j=N&&!$,k=e.method||"GET",O=(0,o.getTracer)(),U=O.getActiveScopeSpan(),I={params:E,prerenderManifest:T,renderOpts:{experimental:{cacheComponents:!!b.experimental.cacheComponents,authInterrupts:!!b.experimental.authInterrupts},supportsDynamicResponse:$,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(y=b.experimental)?void 0:y.cacheLife,isRevalidate:j,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>w.onRequestError(e,t,a,P)},sharedContext:{buildId:R}},D=new i.NodeNextRequest(e),H=new i.NodeNextResponse(t),F=l.NextRequestAdapter.fromNodeNextRequest(D,(0,l.signalFromNodeResponse)(t));try{let s=async r=>w.handle(F,I).finally(()=>{if(!r)return;r.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=O.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=a.get("next.route");if(n){let e=`${k} ${n}`;r.setAttributes({"next.route":n,"http.route":n,"next.span_name":e}),r.updateName(e)}else r.updateName(`${k} ${e.url}`)}),i=async o=>{var i,l;let d=async({previousCacheEntry:r})=>{try{if(!(0,n.getRequestMeta)(e,"minimalMode")&&q&&C&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await s(o);e.fetchMetrics=I.renderOpts.fetchMetrics;let l=I.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=I.renderOpts.collectedTags;if(!N)return await (0,u.sendResponse)(D,H,i,I.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(i.headers);d&&(t[x.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==I.renderOpts.collectedRevalidate&&!(I.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&I.renderOpts.collectedRevalidate,a=void 0===I.renderOpts.collectedExpire||I.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:I.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await w.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:j,isOnDemandRevalidate:q})},P),t}},g=await w.handleResponse({req:e,nextConfig:b,cacheKey:_,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:q,revalidateOnlyGenerated:C,responseGenerator:d,waitUntil:a.waitUntil});if(!N)return null;if((null==g||null==(i=g.value)?void 0:i.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==g||null==(l=g.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,n.getRequestMeta)(e,"minimalMode")||t.setHeader("x-nextjs-cache",q?"REVALIDATED":g.isMiss?"MISS":g.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let y=(0,c.fromNodeOutgoingHttpHeaders)(g.value.headers);return(0,n.getRequestMeta)(e,"minimalMode")&&N||y.delete(x.NEXT_CACHE_TAGS_HEADER),!g.cacheControl||t.getHeader("Cache-Control")||y.get("Cache-Control")||y.set("Cache-Control",(0,h.getCacheControlHeader)(g.cacheControl)),await (0,u.sendResponse)(D,H,new Response(g.value.body,{headers:y,status:g.value.status||200})),null};U?await i(U):await O.withPropagatedContext(e.headers,()=>O.trace(d.BaseServerSpan.handleRequest,{spanName:`${k} ${e.url}`,kind:o.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},i))}catch(t){if(t instanceof g.NoFallbackError||await w.onRequestError(e,t,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:j,isOnDemandRevalidate:q})}),N)throw t;return await (0,u.sendResponse)(D,H,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__f5485c47._.js.map