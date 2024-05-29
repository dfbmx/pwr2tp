urls = """
https://docs.openzeppelin.com/defender/v2/tutorial/access-control, https://docs.openzeppelin.com/defender/v2/,

https://docs.openzeppelin.com/defender/v2/module/code,

https://docs.openzeppelin.com/defender/v2/module/audit, https://docs.openzeppelin.com/defender/v2/module/deploy, https://docs.openzeppelin.com/defender/v2/module/monitor, https://docs.openzeppelin.com/defender/v2/module/actions, https://docs.openzeppelin.com/defender/v2/module/access-control, https://docs.openzeppelin.com/defender/v2/manage, https://docs.openzeppelin.com/defender/v2/manage/relayers, https://docs.openzeppelin.com/defender/v2/logs, https://docs.openzeppelin.com/defender/v2/tutorial/deploy, https://docs.openzeppelin.com/defender/v2/tutorial/monitor, https://docs.openzeppelin.com/defender/v2/tutorial/actions, https://docs.openzeppelin.com/defender/v2/tutorial/workflows, https://docs.openzeppelin.com/defender/v2/guide/forked-network, https://docs.openzeppelin.com/defender/v2/guide/private-network, https://docs.openzeppelin.com/defender/v2/guide/usage-notification https://docs.openzeppelin.com/defender/v2/guide/timelock-roles, https://docs.openzeppelin.com/defender/v2/guide/factory-monitor, https://docs.openzeppelin.com/defender/v2/guide/balance-automation-forta, https://docs.openzeppelin.com/defender/v2/guide/meta-tx, https://docs.openzeppelin.com/defender/v2/dac, https://docs.openzeppelin.com/defender/v2/sdk, https://docs.openzeppelin.com/defender/v2/integrations, https://docs.openzeppelin.com/defender/v2/migration, https://docs.openzeppelin.com/defender/v2/faq, https://docs.openzeppelin.com/defender/v2/changelog"""

# Split the URLs by comma and strip whitespace
urls_list = [url.strip() for url in urls.split(",")]

# Format the URLs as a list of strings for printing
formatted_urls = ',\n'.join(f'"{url}"' for url in urls_list)

# Print the formatted URLs
print(f"[{formatted_urls}]")
