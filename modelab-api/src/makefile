SH_PATH = bin

.PHONY: setup load-dev drop-models create-admin state-export state-import

default:
	@echo "No action specified. Use: setup|load-dev|drop-models|create-admin|state-export|state-import"

setup:
	@bash $(SH_PATH)/setup.sh

load-dev:
	@bash $(SH_PATH)/load-dev.sh

drop-models:
	@bash $(SH_PATH)/drop-models.sh

create-admin:
	@bash $(SH_PATH)/create-admin.sh $(ADMIN_EMAIL)

state-export:
	@bash $(SH_PATH)/state-export.sh

state-import:
	@bash $(SH_PATH)/state-import.sh