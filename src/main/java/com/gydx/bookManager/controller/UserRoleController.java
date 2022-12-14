package com.gydx.bookManager.controller;

import com.alibaba.fastjson.JSONObject;
import com.gydx.bookManager.entity.User;
import com.gydx.bookManager.pojo.ReceiveData;
import com.gydx.bookManager.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    @RequestMapping("/getUserRoleList")
    public String getUserRoleList(Integer page, Integer limit, String roleName, String username, String nickname, String email, Character sex) {
        JSONObject jsonObject = new JSONObject();
        List<User> users, userList;
        if ((username + nickname + email + roleName).equals("") && sex == null) {
            users = userRoleService.getUserRoleListByPage(page, limit);
            userList = userRoleService.getAllUserRoleList();
        } else {
            users = userRoleService.getUserRoleListByPageAndCondition(page, limit, roleName, username,
                    nickname, email, sex);
            userList = userRoleService.getAllUserRoleListByCondition(roleName, username,
                    nickname, email, sex);
        }
        jsonObject.put("code", 0);
        jsonObject.put("msg", "查询成功");
        jsonObject.put("count", userList.size());
        jsonObject.put("data", users);
        return jsonObject.toJSONString();
    }

    @RequestMapping("/deleteOneUserRole")
    public String deleteOneUserRole(@RequestBody User user) {
        JSONObject jsonObject = new JSONObject();
        userRoleService.deleteOneUserRole(user);
        jsonObject.put("msg", "删除成功");
        return jsonObject.toJSONString();
    }

    @RequestMapping("/deleteUserRoles")
    @ResponseBody
    public String deleteUserRoles(@RequestBody List<User> users) {
        JSONObject jsonObject = new JSONObject();
        userRoleService.deleteUserRoles(users);
        jsonObject.put("msg", "删除成功");
        return jsonObject.toJSONString();
    }

    @RequestMapping("/addUserRole")
    public String addUserRole(@RequestBody User user) {
        JSONObject jsonObject = new JSONObject();
        int i = userRoleService.addUserRole(user);
        if (i == 0) {
            jsonObject.put("msg", "该班级负责人已存在！");
            return jsonObject.toJSONString();
        } else if (i == 2) {
            jsonObject.put("msg", "该学院负责人已存在！");
            return jsonObject.toJSONString();
        }
        jsonObject.put("msg", "添加成功");
        return jsonObject.toJSONString();
    }

    @RequestMapping("/updateUserRole")
    public String updateUserRole(@RequestBody User user) {
        JSONObject jsonObject = new JSONObject();
        userRoleService.updateUserRole(user);
        jsonObject.put("msg", "修改成功");
        return jsonObject.toJSONString();
    }

}
