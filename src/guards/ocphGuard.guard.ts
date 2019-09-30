import { UnauthorizedException, mixin } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function OcphRoleGuard(scopes: string[]) {
    return mixin(class ScopesAuth extends AuthGuard('jwt') {
        protected readonly scopes = scopes;
        handleRequest(err, user, info, context) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        let found=false;
        this.scopes.forEach(role=>{
            var xfound=this.scopes.find(x=>x.toLocaleLowerCase()==role.toLocaleLowerCase());
            if(xfound){
                found=true;
            }
        })

        if(!found)
            throw new UnauthorizedException("Anda Tidak Memiliki Akses");
        return user;
        }
    });
}



export function OcphGuard() {
    return mixin(class ScopesAuth extends AuthGuard('jwt') {
        handleRequest(err, user, info, context) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        return user;
        }
    });
}