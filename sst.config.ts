import type { SSTConfig } from "sst"
import { Default } from "src/stacks/Default"
export default {
  config(_input) {
    return {
      name: "sln-signals",
      stage: _input.stage === "production" ? "production" : "development",
      profile: _input.stage === "production" ? "sln-signals-production" : "sln-signals-dev",
      region: "us-east-1",
    }
  },
  stacks(app) {
    app.stack(Default)
  }
  // app.stack(function Site({ stack }) {
  //   const site = new AstroSite(stack, "site", {
  //     bind: [rds],
  //     path: "packages/web",
  //   })
  //   stack.addOutputs({
  //     url: site.url,
  //   })
  // })
  //},
} satisfies SSTConfig
