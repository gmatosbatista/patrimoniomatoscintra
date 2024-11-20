import configparser


class TTConfig:
    config: configparser.ConfigParser = configparser.ConfigParser()
    use_prod: bool = True
    token: str = None
    username: str = None
    password: str = None
    prod_uri: str = None

    def __init__(self, path: str = "./config", filename: str = "toshl.config") -> None:
        self.config.read(f"{path}/{filename}")
        self.use_prod = self.config.get("Config", "use_prod") in (
            "True",
            "true",
            "yes",
            "t",
            "1",
            "y",
            "on",
        )
        self.use_mfa = self.config.get("Config", "use_mfa") in (
            "True",
            "true",
            "yes",
            "t",
            "1",
            "y",
            "on",
        )
        self.username = self.config.get("Credentials", "username")
        self.password = self.config.get("Credentials", "password")
        self.token = self.config.get("Credentials", "token")
        self.prod_uri = self.config.get("URI", "prod")
        
        print(f"use_prod: {self.use_prod}")
        print(f"use_mfa: {self.use_mfa}")
        print(f"prod_uri: {self.prod_uri}")