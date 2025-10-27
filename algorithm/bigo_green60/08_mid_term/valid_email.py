AZ = [chr(i) for i in range(65,91)]
az = [chr(i) for i in range(97, 123)]
digits = [chr(i) for i in range(48, 58)]

def checkAZ(ch):
	for i in AZ:
		if i == ch:
			return True
	return False
def checkaz(ch):
	for i in az:
		if i == ch:
			return True
	return False
def check09(ch):
	for i in digits:
		if i == ch:
			return True
	return False

def checkRules1(email = ''):
	return True if email.count('@') == 1 else False

def checkLocalPart(email):
	local = email.split("@")[0]
	if len(local) == 0:
		return False
	for i in email:
		if i == '@':
			break
		if i != '.' and i != '_' and not checkAZ(i) and not checkaz(i) and not check09(i):
			return False
	return True

def checkDomainName(email):
	domain = email.split("@")[1]
	if len(domain) == 0 or domain.count('.') == 0:
		return False
	for i in range(len(domain)):
		ch = domain[i]
		if ch != '.' and not checkAZ(ch) and not checkaz(ch):
			return False
		elif ch == '.' and (domain[i - 1] == '.' or domain[i + 1] == '.'):
			return False
	return True
			
def checkEmail(email):
	return checkRules1(email) and checkLocalPart(email) and checkDomainName(email)

e = input()
print("VALID" if checkEmail(e) else "INVALID")