import { type StackContext, RDS, Script, AstroSite } from "sst/constructs"

export function Default({ stack }: StackContext) {
  const rds = new RDS(stack, "db", {
    engine: "postgresql13.9",
    defaultDatabaseName: "app_database",
  })
  const site = new AstroSite(stack, "site", {
    bind: [rds],
    path: "packages/web",
  })
  stack.addOutputs({
    url: site.url,
  })

  new Script(stack, "migrations", {
    defaults: {
      function: {
        bind: [rds],
        timeout: 300,
        copyFiles: [
          {
            from: "packages/web/migrations",
            to: "migrations",
          },
        ],
      },
    },
    onCreate: "src/handlers/migrate.handler",
    onUpdate: "src/handlers/migrate.handler",
  })

  stack.addOutputs({
    SiteUrl: site.url,
    RDS_ARN: rds.clusterArn,
    RDS_SECRET: rds.secretArn,
    RDS_DATABASE: rds.defaultDatabaseName,
  })
}
